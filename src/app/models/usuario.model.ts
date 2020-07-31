import { environment } from 'src/environments/environment';
const api_url: string = environment.base_url;
export class Usuario {
  constructor(
    public nombre: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: string,
    public _id?: string
  ) {}

  public get imageUrl(): string {
    if (this.img && this.img.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${api_url}/upload/usuarios/${this.img}`;
    } else {
      return `${api_url}/upload/usuarios/no-image.jpg`;
    }
  }
}
