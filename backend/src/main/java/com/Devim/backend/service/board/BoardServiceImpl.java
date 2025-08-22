package com.Devim.backend.service.board;

import com.Devim.backend.domain.board.Board;
import com.Devim.backend.domain.board.BoardDto;
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
    public Long create(Board board) {
        boardRepository.save(board);
        return board.getBoardNo();
    }

    @Override
    public BoardDto get(Long boardNo) {
        return boardRepository.findById(boardNo)
                .orElseThrow(() -> new NoSuchElementException("Board Not Found" + boardNo));
    }

    @Override
    public PageResponseDto<BoardDto> list(PageRequestDto pageRequestDto, Integer boardTypeNo) {
        return boardRepository.findAll(pageRequestDto, boardTypeNo);
    }

    @Override
    public PageResponseDto<BoardDto> search(String title, PageRequestDto pageRequestDto) {
        return boardRepository.searchByTitle(pageRequestDto, title);
    }

    @Override
    public List<BoardDto> listPopular(int limit) {
        return boardRepository.findPopularBoards(limit);
    }

    @Override
    @Transactional
    public void update(Board board) {
        boardRepository.update(board);
    }

    @Override
    @Transactional
    public void delete(Long boardNo) {
        boardRepository.deleteById(boardNo);
    }

    @Override
    public List<BoardDto> getRecent(Integer boardTypeNo, int limit) {
        return boardRepository.findRecent(boardTypeNo, limit);
    }

    @Override
    public List<MonthlyCountDto> countMonthlyPosts() {
        return boardRepository.countMonthlyPosts();
    }
}
