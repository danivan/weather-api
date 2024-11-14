export class CreateCityDto {
  name: string;
  latitude: number;
  longitude: number;
  isCurrentLocation: boolean;
  isDefault?: boolean;
}
