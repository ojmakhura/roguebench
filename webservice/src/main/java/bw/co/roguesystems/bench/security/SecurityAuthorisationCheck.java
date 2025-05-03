package bw.co.roguesystems.bench.security;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface SecurityAuthorisationCheck {
    
    String applicationCode() default "";
    String path();
    String method() default "";
}
