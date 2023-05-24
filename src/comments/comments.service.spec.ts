import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CommentsService } from './comments.service';


describe('CommentsService', () => {
  let commentsService: CommentsService;
  let jwtService: JwtService;
  let commentsRepository: any;

  beforeEach(() => {
    commentsRepository = {
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      destroy: jest.fn(),
      findAndCountAll: jest.fn(),
    };


    commentsService = new CommentsService(commentsRepository, jwtService);
  });

  describe('getCommentsByFilmId', () => {
    it('должен вернуть коментарий если он есть', async () => {

      const filmId = 1;
      const comments = [{ id: 1, filmId: 1 }, { id: 2, filmId: 1 }];
      commentsRepository.findAll.mockResolvedValue(comments);

      const result = await commentsService.getCommentsByFilmId(filmId);


      expect(commentsRepository.findAll).toHaveBeenCalledWith({ where: { filmId } });
      expect(result).toEqual(comments);
    });

    it('should throw HttpException when comments do not exist', async () => {

      const filmId = 1;
      commentsRepository.findAll.mockResolvedValue([]);

      await expect(commentsService.getCommentsByFilmId(filmId)).rejects.toThrowError(
          new HttpException(`Комментарии к фильму с id = ${filmId} не найдены`, HttpStatus.NOT_FOUND),
      );
      expect(commentsRepository.findAll).toHaveBeenCalledWith({ where: { filmId } });
    });
  });


});
