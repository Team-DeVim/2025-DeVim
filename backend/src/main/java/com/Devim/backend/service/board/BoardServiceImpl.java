package com.Devim.backend.service.board;

import com.Devim.backend.domain.board.*;
import com.Devim.backend.domain.common.MonthlyCountDto;
import com.Devim.backend.domain.common.PageRequestDto;
import com.Devim.backend.domain.common.PageResponseDto;
import com.Devim.backend.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;

    @Override
    @Transactional
    public Long create(BoardCreateRequestDto requestDto, Long userNo) {
        Board board = new Board();
        board.setBoardTypeNo(requestDto.getBoardTypeNo());
        board.setTitle(requestDto.getTitle());
        board.setBoardContent(requestDto.getBoardContent());
        board.setWriter(userNo.intValue());
        boardRepository.save(board);
        return board.getBoardNo();
    }

    @Override
    public BoardDetailResponseDto get(Long boardNo, Long currentUserNo) {
        return boardRepository.findById(boardNo, currentUserNo)
                .orElseThrow(() -> new NoSuchElementException("Board Not Found" + boardNo));
    }

    @Override
    public PageResponseDto<BoardListResponseDto> list(PageRequestDto pageRequestDto, Integer boardTypeNo) {
        return boardRepository.findAll(pageRequestDto, boardTypeNo);
    }

    @Override
    public PageResponseDto<BoardListResponseDto> search(String title, PageRequestDto pageRequestDto) {
        return boardRepository.searchByTitle(pageRequestDto, title);
    }

    @Override
    public List<BoardListResponseDto> listPopular(int limit) {
        return boardRepository.findPopularBoards(limit);
    }

    @Override
    @Transactional
    public void update(Long boardNo, BoardUpdateRequestDto requestDto) {
        Board board = new Board();
        board.setBoardNo(boardNo);
        board.setTitle(requestDto.getTitle());
        board.setBoardContent(requestDto.getBoardContent());
        boardRepository.update(board);
    }

    @Override
    @Transactional
    public void delete(Long boardNo) {
        boardRepository.deleteById(boardNo);
    }

    @Override
    public List<BoardListResponseDto> getRecent(Integer boardTypeNo, int limit) {
        return boardRepository.findRecent(boardTypeNo, limit);
    }

    @Override
    public List<MonthlyCountDto> countMonthlyPosts() {
        return boardRepository.countMonthlyPosts();
    }
}
