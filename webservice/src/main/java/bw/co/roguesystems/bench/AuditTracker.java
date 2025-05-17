package bw.co.roguesystems.bench;

import java.time.LocalDateTime;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;

public class AuditTracker {

    public static void auditTrail(AuditableDTO auditable, Authentication authentication) {
        if (auditable != null) {
            String username = "anonymousUser";
            if (authentication != null) {

                Jwt jwt = (Jwt) authentication.getPrincipal();
                username = jwt.getClaimAsString("preferred_username");
            }

            if (StringUtils.isBlank(auditable.getId())) {

                auditable.setCreatedBy(username);
                auditable.setCreatedAt(LocalDateTime.now());
            } else {

                auditable.setModifiedBy(username);
                auditable.setModifiedAt(LocalDateTime.now());
            }

        }
    }
}
