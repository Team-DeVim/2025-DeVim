package com.Devim.backend.mapper.board;

import com.Devim.backend.domain.board.Board;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Optional;

@Mapper
public interface BoardMapper {

    void save(Board board);

    Optional<Board> findById(long boardNo);

    List<Board> findAll();

    void update(Board board);

    void deleteById(long boardNo);
}

