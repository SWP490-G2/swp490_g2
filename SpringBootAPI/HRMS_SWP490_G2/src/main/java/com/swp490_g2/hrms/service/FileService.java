package com.swp490_g2.hrms.service;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class FileService {

    private final String UPLOAD_ROOT = "uploads";
    private final Path root = Paths.get(UPLOAD_ROOT);

    public void init() {
        try {
            Files.createDirectories(root);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    private Optional<String> getExtension(String filename) {
        return Optional.ofNullable(filename)
                .filter(f -> f.contains("."))
                .map(f -> f.substring(filename.lastIndexOf(".") + 1));
    }

    public String save(MultipartFile file, String... paths) {
        try {
            Path path = Paths.get(UPLOAD_ROOT, paths);
            if (!Files.exists(path))
                Files.createDirectories(path);

            Path filePath = path.resolve("file_" + new Date().getTime() + "." + getExtension(file.getOriginalFilename()).get());
            Files.copy(file.getInputStream(), filePath);
            return filePath.toString();
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    public Resource load(String filename) {
        try {
            filename = filename.substring(1, filename.length() - 1);
            Resource resource = new FileSystemResource(filename);

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    public void deleteAll() {
        FileSystemUtils.deleteRecursively(root.toFile());
    }

    public Stream<Path> loadAll(String... paths) {
        try {
            Path folderPath = Paths.get(UPLOAD_ROOT, paths);
            return Files.walk(folderPath, 1).filter(path -> !path.equals(folderPath)).map(folderPath::relativize);
        } catch (IOException e) {
            throw new RuntimeException("Could not load the files!");
        }
    }
}