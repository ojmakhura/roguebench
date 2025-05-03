package bw.co.roguesystems.bench.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class ErrorResponse {
    private int status;
    private String error;
    private String message;
    private String path;
    private String errorCode;
    private LocalDateTime timestamp;

    public ErrorResponse(HttpStatus status, String message, String path, String errorCode) {
        this.status = status.value();
        this.error = status.getReasonPhrase();
        this.message = message;
        this.path = path;
        this.errorCode = errorCode;
        this.timestamp = LocalDateTime.now();
    }
}
