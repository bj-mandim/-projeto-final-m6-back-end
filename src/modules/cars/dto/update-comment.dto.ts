import { PartialType } from '@nestjs/mapped-types';

import { CommentDto } from './create-car.dto';

export class UpdateCommentDto extends PartialType(CommentDto) {}
