import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  isCurrentLocation: boolean;

  @Column({
    default: false,
  })
  isDefault: boolean;
}
