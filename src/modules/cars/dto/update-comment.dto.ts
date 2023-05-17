import { PartialType } from '@nestjs/swagger';

import { CommentDto } from './create-car.dto';

export class UpdateCommentDto extends PartialType(CommentDto) {}
