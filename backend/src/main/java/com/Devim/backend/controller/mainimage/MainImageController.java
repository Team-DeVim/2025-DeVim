package com.Devim.backend.controller.mainimage;

import com.Devim.backend.domain.mainimage.MainImage;
import com.Devim.backend.service.mainimage.MainImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/main-images")
public class MainImageController {

    private final MainImageService mainImageService;

    @GetMapping
    public ResponseEntity<List<MainImage>> getAllImages() {
        return ResponseEntity.ok(mainImageService.findAll());
    }

    // Note: Security for admin endpoints will be handled later
    @PostMapping
    public ResponseEntity<Void> uploadImage(@RequestParam("file") MultipartFile file, @RequestParam("priority") int priority) throws IOException {
        mainImageService.saveImage(file, priority);
        return ResponseEntity.status(201).build(); // 201 Created
    }

    @DeleteMapping("/{imageNo}")
    public ResponseEntity<Void> deleteImage(@PathVariable long imageNo) throws IOException {
        mainImageService.deleteImage(imageNo);
        return ResponseEntity.noContent().build(); // 204 No Content
    }

    @PatchMapping("/swap-priority")
    public ResponseEntity<Void> swapImagePriority(@RequestParam long imageId1, @RequestParam long imageId2) {
        mainImageService.swapPriority(imageId1, imageId2);
        return ResponseEntity.ok().build();
    }
}
