import { PrismaService } from "src/prisma.services";
import {Book} from "./book.model";
import { Injectable } from "@nestjs/common/decorators";
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class BookService {
    constructor(private prisma: PrismaService){}
    async getAllBook(): Promise<Book[]>{
        return this.prisma.book.findMany()
    }


    async getBook(id:number): Promise<Book | null>{
        if (!id) {
            throw new BadRequestException('Id required');
          }
        return this.prisma.book.findUnique({where : {id:Number(id)}})
    }


    async createBook(data: Book):Promise<Book>{
        if (!data.title || !data.description) {
            throw new BadRequestException('Title and description are required fields');
          }
        
        return this.prisma.book.create({
            data,
        })
    }
    async updateBook(id:number, data:Book): Promise<Book>{
        if (!id) {
            throw new BadRequestException('Id required');
          }
        return this.prisma.book.update({
            where:{id:Number(id)},
            data:{title:data.title, description:data.description}
        })
    }

    async deleteBook(id:number): Promise<Book>{
        return this.prisma.book.delete({
            where:{id:Number(id)}        })
    }
}