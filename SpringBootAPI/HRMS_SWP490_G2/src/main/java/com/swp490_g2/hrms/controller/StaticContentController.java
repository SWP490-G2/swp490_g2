package com.swp490_g2.hrms.controller;

import org.apache.commons.io.IOUtils;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;

@RestController
@RequestMapping("/.well-known/pki-validation")
public class StaticContentController {
    @GetMapping(
            value = "/DD9D69AD06FDEBD3DA9134BAEDC9C12C.txt",
            produces = MediaType.APPLICATION_OCTET_STREAM_VALUE
    )
    public @ResponseBody byte[] getFile() throws IOException {
        Resource resource = new FileSystemResource("uploads/DD9D69AD06FDEBD3DA9134BAEDC9C12C.txt");
        return IOUtils.toByteArray(resource.getInputStream());
    }
}
