/* eslint-disable prettier/prettier */
import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import Stripe from 'stripe';
import { FlightsService } from 'src/flights/flights.service';
import { handleResponse, handleError } from 'src/common/helpers';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FetchQueryResponse } from './dto/bookings-response.dto';

@ApiTags('Bookings APIs')
@Controller('booking')
export class BookingController {
  private readonly stripe: Stripe;
  constructor(
    private readonly bookingService: BookingService,
    private readonly flightsService: FlightsService,
  ) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  @Post()
  @ApiBody({
    type: CreateBookingDto,
  })
  @ApiOkResponse({ type: FetchQueryResponse })
  async create(@Body() createBookingDto: CreateBookingDto) {
    try {
      const flight: any = await this.flightsService.findOne({
        id: createBookingDto.flightId,
      });

      const line_items = {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: `${createBookingDto.first_name} ${createBookingDto.last_name}`,
            images: [flight.airline.img],
            metadata: {
              id: flight.id,
            },
          },
          unit_amount: flight.price * 100,
        },
        quantity: Number(createBookingDto.no_of_tickets),
      };

      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [line_items],
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/stripe-payment/success`,
        cancel_url: `${process.env.CLIENT_URL}/user-details/${createBookingDto.flightId}`,
      });
      await this.bookingService.create({
        firstName: createBookingDto.first_name,
        lastName: createBookingDto.last_name,
        email: createBookingDto.email,
        mobileNumber: createBookingDto.mobile_number,
        url: session.url,
        ticketClass: createBookingDto.ticket_class,
        flightId: flight.id,
      });

      return handleResponse(
        { url: session.url },
        'Booking made successfully',
        HttpStatus.ACCEPTED,
      );
    } catch (error) {
      return handleError(error.message, error, HttpStatus.BAD_REQUEST);
    }
  }
}
