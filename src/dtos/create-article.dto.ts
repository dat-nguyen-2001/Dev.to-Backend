import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  tags: string;

  coverImage: string;
}