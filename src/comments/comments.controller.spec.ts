import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comments.service';
import { CommentsDto } from './dto/comments.dto';
import { UpdateCommentDto } from './dto/updateCommentDto';
import { JwtService } from '@nestjs/jwt';
import { Comments } from './comments.model';
import { getModelToken } from '@nestjs/sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('CommentsService', () => {
    let commentsService: CommentsService;
    let jwtService: JwtService;
    let commentsModel: typeof Comments;
    let comment = {
        comment: 'здесь текст',
        displayName: 'Peter',
        filmId: 1,
        parentCommentId: 2,
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CommentsService,
                JwtService,
                {
                    provide: getModelToken(Comments),
                    useValue: {
                        findAll: jest.fn(),
                        create: jest.fn(),
                        update: jest.fn(),
                        destroy: jest.fn(),
                        findAndCountAll: jest.fn(),
                    },
                },
            ],
        }).compile();

        commentsService = module.get<CommentsService>(CommentsService);
        jwtService = module.get<JwtService>(JwtService);
        commentsModel = module.get<typeof Comments>(getModelToken(Comments));
    });

    describe('createComment', () => {
        it('Должен создать новый комментарий', async () => {
            const dto: CommentsDto =comment;
            const refreshToken = 'token';
            const user = { displayName: 'Peter' };

            jest.spyOn(jwtService, 'verify').mockReturnValue(Promise.resolve(user));
            jest.spyOn(commentsModel, 'create').mockReturnValue(Promise.resolve());

            await expect(commentsService.createComment(dto, refreshToken)).resolves.toBeUndefined();

            expect(jwtService.verify).toHaveBeenCalledWith(refreshToken, { secret: 'FFFGKJKFWMV' });
            expect(commentsModel.create).toHaveBeenCalledWith(dto);
        });

        it('should throw an error if the comment creation fails', async () => {
            const dto: CommentsDto = comment;
            const refreshToken = 'token';
            const user = { displayName: 'Peter' };

            jest.spyOn(jwtService, 'verify').mockReturnValue(Promise.resolve(user));
            jest.spyOn(commentsModel, 'create').mockRejectedValue(new HttpException('Comment creation failed', HttpStatus.INTERNAL_SERVER_ERROR));

            await expect(() => commentsService.createComment(dto, refreshToken)).rejects.toThrow(HttpException);

            expect(jwtService.verify).toHaveBeenCalledWith(refreshToken, { secret: 'FFFGKJKFWMV' });
            expect(commentsModel.create).toHaveBeenCalledWith(dto);
        });
    });

});
