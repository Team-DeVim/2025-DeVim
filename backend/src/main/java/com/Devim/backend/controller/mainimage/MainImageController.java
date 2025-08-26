package com.Devim.backend.controller.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.domain.mainimage.MainImageResetRequestDto;
import com.Devim.backend.service.mainimage.MainImageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Tag(name = "Main Image Controller", description = "메인 페이지 이미지 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/main-images")
public class MainImageController {

    private final MainImageService mainImageService;

    @Operation(summary = "모든 메인 이미지 조회", description = "메인 페이지에 표시될 모든 이미지 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @GetMapping
    public ResponseEntity<List<MainImage>> getAllImages() {
        return ResponseEntity.ok(mainImageService.findAll());
    }

    @Operation(summary = "메인 이미지 목록 전체 리셋", description = "메인 이미지 목록 전체를 새로운 목록으로 교체합니다. (관리자용)")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "성공")
    })
    @PutMapping
    public ResponseEntity<Void> resetImages(@RequestBody List<MainImageResetRequestDto> dtoList) {
        mainImageService.resetImages(dtoList);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "메인 이미지 업로드 (파일만)", description = "메인 페이지에 사용할 이미지를 업로드하고, 저장된 경로를 반환합니다. (관리자용)",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
            )
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "업로드 성공")
    })
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@Parameter(description = "업로드할 이미지 파일") @RequestParam("file") MultipartFile file) throws IOException {
        String filePath = mainImageService.uploadImage(file);
        return ResponseEntity.status(201).body(filePath);
    }

    /*
    @Operation(summary = "메인 이미지 삭제", description = "메인 이미지를 삭제합니다. (관리자용)",
            parameters = {
                    @Parameter(name = "imageNo", description = "삭제할 이미지 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "삭제 성공")
    })
    @DeleteMapping("/{imageNo}")
    public ResponseEntity<Void> deleteImage(@PathVariable("imageNo") long imageNo) throws IOException {
        mainImageService.deleteImage(imageNo);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "메인 이미지 우선순위 변경", description = "두 이미지의 우선순위를 교체합니다. (관리자용)",
            parameters = {
                    @Parameter(name = "imageId1", description = "첫 번째 이미지 번호", required = true),
                    @Parameter(name = "imageId2", description = "두 번째 이미지 번호", required = true)
            }
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공")
    })
    @PatchMapping("/swap-priority")
    public ResponseEntity<Void> swapImagePriority(@RequestParam long imageId1, @RequestParam long imageId2) {
        mainImageService.swapPriority(imageId1, imageId2);
        return ResponseEntity.ok().build();
    }
    */
}
