package com.Devim.backend.repository.mybatis;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDetailResponseDto;
import com.Devim.backend.domain.board.BoardListResponseDto;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Optional;

@Mapper
public interface BoardMapper {

    void save(Board board);

    Optional<BoardDetailResponseDto> findById(@Param("boardNo") long boardNo, @Param("currentUserNo") Long currentUserNo);

    // boardTypeNo는 필수가 아닌 선택값인데 int는 원시타입으로 null을 가질 수 없기 때문에 Integer 사용
    List<BoardListResponseDto> findAll(@Param("pageRequest") PageRequestDto pageRequest, @Param("boardTypeNo") Integer boardTypeNo);

    long countAll(@Param("boardTypeNo") Integer boardTypeNo);

    List<BoardListResponseDto> searchByTitle(@Param("pageRequest") PageRequestDto pageRequest, @Param("title") String title);

    long countByTitle(@Param("title") String title);

    List<BoardListResponseDto> findPopularBoards(@Param("limit") int limit);

    void update(Board board);

    void deleteById(@Param("boardNo") long boardNo);

    List<BoardListResponseDto> findRecent(@Param("boardTypeNo") Integer boardTypeNo, @Param("limit") int limit);

    List<MonthlyCountDto> countMonthlyPosts();
}

