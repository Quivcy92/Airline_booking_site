/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { FlightsService } from './flights.service';
import { CreateFlightDto, FetchFlightQuery } from './dto/create-flight.dto';
import { LocationService } from 'src/location/location.service';
import { handleError, handleResponse } from 'src/common/helpers';
import { FetchQueryResponse } from './dto/flight-response.dto';
import { ApiOkResponse, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Flights APIs')
@Controller('flights')
export class FlightsController {
  constructor(
    private readonly flightsService: FlightsService,
    private readonly locationService: LocationService,
  ) {}

  @Post()
  create(@Body() createFlightDto: CreateFlightDto) {
    const {
      airlineId,
      originId,
      destinationId,
      price,
      roundTrip,
      departureDate,
      arrivalDate,
    } = createFlightDto;
    return this.flightsService.create({
      airlineId,
      originId,
      destinationId,
      price,
      roundTrip,
      departureDate,
      arrivalDate,
    });
  }

  @Get('/:flightId')
  @ApiOkResponse({ type: FetchQueryResponse })
  @ApiParam({
    name: 'flightId',
    type: 'string',
    description: 'id of specific flight',
    example: '',
  })
  async findAll(@Param('flightId') flightId: string) {
    try {
      const flight = await this.flightsService.findOne({ id: flightId });
      return handleResponse(
        flight,
        'Flight fetched successfully',
        HttpStatus.ACCEPTED,
      );
    } catch (error) {
      return handleError(error.message, error, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/')
  @ApiOkResponse({ type: FetchQueryResponse })
  @ApiQuery({
    name: 'originId',
    type: 'string',
    description: 'Flights with particular originId',
    example: '',
  })
  @ApiQuery({
    name: 'destinationId',
    type: 'string',
    description: 'Flights with particular destinationId',
    example: '',
  })
  @ApiQuery({
    name: 'roundTrip',
    type: 'boolean',
    description: 'To verify id the flight is a round trip',
    example: '',
  })
  async findWhere(@Query() query: FetchFlightQuery) {
    try {
      let roundTrip: boolean = false;
      switch (String(query.roundTrip)) {
        case 'false' || false:
          roundTrip = false;
          break;
        case 'true' || true:
          roundTrip = true;
          break;
        default:
          break;
      }

      let origin = null;
      let destination = null;
      if (
        !this.isValidObjectId(query.originId) ||
        !this.isValidObjectId(query.destinationId)
      ) {
        origin = await this.locationService.findOneWhere(query.originId);
        destination = await this.locationService.findOneWhere(
          query.destinationId,
        );
        console.log('origin', origin, 'destination', destination);
        await this.flightsService.findWhere(
          origin.id,
          destination.id,
          roundTrip,
        );
        const resp = await this.flightsService.findAll(roundTrip);
        return handleResponse(
          resp,
          'Flights fetched successfully',
          HttpStatus.ACCEPTED,
        );
      } else {
        console.log(
          'query.originId',
          query.originId,
          'query.destinationId',
          query.destinationId,
        );

        await this.flightsService.findWhere(
          query.originId,
          query.destinationId,
          roundTrip,
        );
        const resp = await this.flightsService.findAll(roundTrip);
        return handleResponse(
          resp,
          'Flights fetched successfully',
          HttpStatus.ACCEPTED,
        );
      }
    } catch (error) {
      return handleError(error.message, error, HttpStatus.BAD_REQUEST);
    }
  }

  private isValidObjectId(id: string): boolean {
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;
    return objectIdPattern.test(id);
  }
}
