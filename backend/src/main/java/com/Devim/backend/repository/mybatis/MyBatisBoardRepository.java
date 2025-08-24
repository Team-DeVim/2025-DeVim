package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDetailResponseDto;
import com.Devim.backend.domain.board.BoardListResponseDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.repository.BoardRepository;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public class MyBatisBoardRepository implements BoardRepository {

    private final BoardMapper boardMapper;

    public MyBatisBoardRepository(BoardMapper boardMapper) {
        this.boardMapper = boardMapper;
    }

    @Override
    public void save(Board board) {
        boardMapper.save(board);
    }

    @Override
    public Optional<BoardDetailResponseDto> findById(long boardNo, Long currentUserNo) {
        return boardMapper.findById(boardNo, currentUserNo);
    }

    @Override
    public PageResponseDto<BoardListResponseDto> findAll(PageRequestDto pageRequest, Integer boardTypeNo, Long userNo) {
        List<BoardListResponseDto> dtoList = boardMapper.findAll(pageRequest, boardTypeNo, userNo);
        long totalCount = boardMapper.countAll(boardTypeNo, userNo);
        return new PageResponseDto<>(dtoList, pageRequest, totalCount);
    }

    @Override
    public PageResponseDto<BoardListResponseDto> searchByTitle(PageRequestDto pageRequest, String title) {
        List<BoardListResponseDto> dtoList = boardMapper.searchByTitle(pageRequest, title);
        long totalCount = boardMapper.countByTitle(title);
        return new PageResponseDto<>(dtoList, pageRequest, totalCount);
    }

    @Override
    public void update(Board board) {
        boardMapper.update(board);
    }

    @Override
    public void deleteById(long boardNo) {
        boardMapper.deleteById(boardNo);
    }

    @Override
    public List<BoardListResponseDto> findPopularBoards(int limit) {
        return boardMapper.findPopularBoards(limit);
    }

    @Override
    public List<BoardListResponseDto> findRecent(Integer boardTypeNo, int limit) {
        return boardMapper.findRecent(boardTypeNo, limit);
    }

    @Override
    public List<MonthlyCountDto> countMonthlyPosts() {
        return boardMapper.countMonthlyPosts();
    }
}