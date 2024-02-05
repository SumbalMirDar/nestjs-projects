import { Body,Controller,Delete,Post,Get,Param,Put,Req,Res } from "@nestjs/common";

import { Book } from "./book.model";

import { BookService } from "./book.service";

import { Request, Response, response } from "express";
@Controller('api/v1/book')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Get()
    async getAllBook(@Req() request:Request, @Res() response:Response): Promise<any> {
        //return this.bookService.getAllBook()
        const result = await this.bookService.getAllBook();
        return response.status(200).json({
            status:"OK",
            messege:"successfully fetched the records",
            result:result
        })
    
    }
    @Post()
    async postBook(@Body() postData: Book):Promise<Book>{
        return this.bookService.createBook(postData)
    }

    @Get(':id')
    async getBook(@Param('id') id:number): Promise<Book | null> {
        return this.bookService.getBook(id)
    }
    @Delete(':id')
    async deleteBook(@Param('id') id:number): Promise<Book> {
        return this.bookService.deleteBook(id)
    }
    @Put(':id')
    async updateBook( @Param('id') id:number,@Body() postData: Book): Promise<Book> {
        return this.bookService.updateBook(id,postData)
    }

}

