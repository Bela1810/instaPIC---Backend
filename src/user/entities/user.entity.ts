import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn('uuid')       /**Clave Primaria con identificador unico*/
    id:string;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column('text')
    name: string;

    @Column()
    email: string;

    @Column({
        type:'text',
        default: '',
        name: 'profile_image'
    })
    profileImage: string;

    @Column({
        default:true,
        name: 'is_active'
    })
    isActive: boolean;  

    @Column({
        type:'enum',
        enum:['user', 'admin'],
        default: ['user'],
        array: true    /**Cuando recupere los datos lo devuelve en arreglo */
    })
    roles: string[];
}
