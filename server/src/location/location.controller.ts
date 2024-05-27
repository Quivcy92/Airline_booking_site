/* eslint-disable prettier/prettier */
import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { LocationService } from './location.service';
import { FetchQuery } from './dto/create-location.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FetchQueryResponse } from './dto/location-response.dto';
import { handleError, handleResponse } from 'src/common/helpers';

@ApiTags('Location APIs')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  @ApiOkResponse({ type: FetchQueryResponse })
  @ApiQuery({
    name: 'name',
    type: 'string',
    description: 'name of location',
    example: '',
  })
  async find(@Query() query: FetchQuery) {
    try {
      if (query.name === '' || !query) {
        const resp = await this.locationService.findAll();
        return handleResponse(
          resp,
          'Location fetched successfully',
          HttpStatus.ACCEPTED,
        );
      }
      const resp = await this.locationService.findWhere(query.name);
      return handleResponse(
        resp,
        'Location fetched successfully',
        HttpStatus.ACCEPTED,
      );
    } catch (error) {
      return handleError(error.message, error, HttpStatus.BAD_REQUEST);
    }
  }
}
