package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
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
    public Optional<BoardDto> findById(long boardNo) {
        return boardMapper.findById(boardNo);
    }

    @Override
    public PageResponseDto<BoardDto> findAll(PageRequestDto pageRequest) {
        List<BoardDto> dtoList = boardMapper.findAll(pageRequest);
        long totalCount = boardMapper.countAllBoards();
        return new com.Devim.backend.domain.common.PageResponseDto<>(dtoList, pageRequest, totalCount);
    }

    @Override
    public void update(Board board) {
        boardMapper.update(board);
    }

    @Override
    public void deleteById(long boardNo) {
        boardMapper.deleteById(boardNo);
    }
}
