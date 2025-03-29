import {Controller, UseGuards, Post, Body, ValidationPipe, BadRequestException, Get, Delete, Param} from "@nestjs/common";
import {API_PREFIX} from "../../../share/constants/api.constant";
import {AccessGuard} from "../../../guards/access.guard";
import {ReservationService} from "../../base/reservation/reservation.service";
import {HotelRoomService} from "../../base/hotel/hotel-room.service";
import {CreateReservationDto, CreateReservationResponseDto} from "./dto/create-reservation.dto";
import {ReservationListItemDto} from "./dto/reservation-list.dto";

@Controller(API_PREFIX)
@UseGuards(AccessGuard)
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly hotelRoomService: HotelRoomService
    ) {}

    // 2.2.1. Бронирование номера клиентом
    @Post('client/reservations')
    async createReservation(
        @Body(new ValidationPipe({ transform: true })) createReservationDto: CreateReservationDto
    ): Promise<CreateReservationResponseDto> {
        const { hotelRoom, startDate, endDate } = createReservationDto;

        const room = await this.hotelRoomService.findById(hotelRoom);
        if (!room) {
            throw new BadRequestException('Номер не найден');
        }
        if (!room.isEnabled) {
            throw new BadRequestException('Номер отключен');
        }

        const reservation = await this.reservationService.addReservation({
            userId: 'current-user-id', // TODO: Получить ID текущего пользователя
            hotelId: room.hotel,
            roomId: hotelRoom,
            dateStart: new Date(startDate),
            dateEnd: new Date(endDate)
        });

        const hotel = await this.hotelRoomService.findById(room.hotel);

        return {
            startDate: reservation.dateStart.toISOString(),
            endDate: reservation.dateEnd.toISOString(),
            hotelRoom: {
                description: room.description,
                images: room.images
            },
            hotel: {
                title: hotel.title,
                description: hotel.description
            }
        };
    }

    // 2.2.2. Список броней текущего пользователя
    @Get('client/reservations')
    async getReservations(): Promise<ReservationListItemDto[]> {
        const userId = 'current-user-id'; // TODO: Получить ID текущего пользователя
        const now = new Date();
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);

        const reservations = await this.reservationService.getReservations({
            userId,
            dateStart: now,
            dateEnd: futureDate
        });

        const result = await Promise.all(reservations.map(async (reservation) => {
            const room = await this.hotelRoomService.findById(reservation.roomId);
            const hotel = await this.hotelRoomService.findById(room.hotel);

            return {
                startDate: reservation.dateStart.toISOString(),
                endDate: reservation.dateEnd.toISOString(),
                hotelRoom: {
                    description: room.description,
                    images: room.images
                },
                hotel: {
                    title: hotel.title,
                    description: hotel.description
                }
            };
        }));

        return result;
    }

    // 2.2.3. Отмена бронирования клиентом
    @Delete('client/reservations/:id')
    async deleteReservation(@Param('id') id: string): Promise<void> {
        const userId = 'current-user-id'; // TODO: Получить ID текущего пользователя
        
        const reservations = await this.reservationService.getReservations({
            userId,
            dateStart: new Date(0),
            dateEnd: new Date()
        });

        const reservation = reservations.find(r => r._id === id);
        if (!reservation) {
            throw new BadRequestException('Бронирование не найдено');
        }
        if (reservation.userId !== userId) {
            throw new BadRequestException('Вы не можете отменить это бронирование');
        }

        await this.reservationService.removeReservation(id);
    }

    // 2.2.4. Список броней конкретного пользователя
    @Get('manager/reservations/:userId')
    async getUserReservations(@Param('userId') userId: string): Promise<ReservationListItemDto[]> {
        const now = new Date();
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);

        const reservations = await this.reservationService.getReservations({
            userId,
            dateStart: now,
            dateEnd: futureDate
        });

        const result = await Promise.all(reservations.map(async (reservation) => {
            const room = await this.hotelRoomService.findById(reservation.roomId);
            const hotel = await this.hotelRoomService.findById(room.hotel);

            return {
                startDate: reservation.dateStart.toISOString(),
                endDate: reservation.dateEnd.toISOString(),
                hotelRoom: {
                    description: room.description,
                    images: room.images
                },
                hotel: {
                    title: hotel.title,
                    description: hotel.description
                }
            };
        }));

        return result;
    }

    // 2.2.5. Отмена бронирования менеджером
    @Delete('manager/reservations/:id')
    async deleteReservationByManager(@Param('id') id: string): Promise<void> {
        const reservations = await this.reservationService.getReservations({
            userId: 'any', // Любой userId, так как нам нужно найти бронь по id
            dateStart: new Date(0),
            dateEnd: new Date()
        });

        const reservation = reservations.find(r => r._id === id);
        if (!reservation) {
            throw new BadRequestException('Бронирование не найдено');
        }

        await this.reservationService.removeReservation(id);
    }
} 