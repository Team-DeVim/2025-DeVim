package com.Devim.backend.domain.common;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import lombok.Builder;
import lombok.Data;

@Data
public class PageResponseDto<E> {
	private List<E> dtoList;

	private List<Integer> pageNumList;

	private PageRequestDto pageRequestDTO;

	private boolean prev;	// 이전 페이지의 유무
	private boolean next;	// 다음 페이지의 유무
	private int totalCount;	// 게시글의 총 개수
	private int prevPage;	// 이전 페이지로 이동했을때 시작 페이지 ex)11~20 에서 이전 버튼을 누르면 10페이지
	private int nextPage;	// 다음 페이지로 이동했을때 시작 페이지 ex)11~20 에서 다음 버튼을 누르면 21페이지
	private int totalPage;	// 
	private int current;	// 현재 요청한 페이지 번호

	@Builder(builderMethodName = "withAll")
	public PageResponseDto(List<E> dtoList, PageRequestDto pageRequestDTO, long totalCount) {
		this.dtoList = dtoList;

		this.pageRequestDTO = pageRequestDTO;

		this.totalCount = (int) totalCount;

		// ceil() : 소수점 자리 숫자를 무조건 올림
		// 현재 페이지가 속한 시작(start)과 끝(end)을 구한다 
		int end = (int) (Math.ceil(pageRequestDTO.getPage() / 10.0)) * 10;
		int start = end - 9;

		// 마지막 페이지
		int last = (int) (Math.ceil((totalCount / (double) pageRequestDTO.getSize())));


		end = end > last ? last : end;

		this.prev = start > 1;
		this.next = totalCount > end * pageRequestDTO.getSize();

		// start =1, end= 10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] List<Integer> 만들어낸다.
		this.pageNumList = IntStream.rangeClosed(start, end).boxed().collect(Collectors.toList());

		if (prev) {
			this.prevPage = start - 1;
		}
		if (next) {
			this.nextPage = end + 1;
		}


		this.totalPage = this.pageNumList.size();
		
		this.current = pageRequestDTO.getPage();
	}
}
