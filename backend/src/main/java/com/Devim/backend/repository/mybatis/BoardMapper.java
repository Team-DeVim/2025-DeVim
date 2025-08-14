package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
import com.Devim.backend.domain.common.PageRequestDto;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface BoardMapper {

    void save(Board board);

    Optional<BoardDto> findById(long boardNo);

    List<BoardDto> findAll(PageRequestDto pageRequest);

    long countAllBoards();

    void update(Board board);

    void deleteById(long boardNo);
}

