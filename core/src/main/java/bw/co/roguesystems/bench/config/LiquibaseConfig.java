package bw.co.roguesystems.bench.config;

import javax.sql.DataSource;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

import liquibase.integration.spring.SpringLiquibase;

@Configuration
public class LiquibaseConfig {
    
    private final DataSource dataSource;

    public LiquibaseConfig(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @Bean
    public SpringLiquibase liquibase() {
        SpringLiquibase liquibase = new SpringLiquibase();
        liquibase.setDataSource(dataSource);
        liquibase.setChangeLog("classpath:db/db.changelog-master.xml");
        liquibase.setContexts("development,test,production");
        liquibase.setShouldRun(false);
        return liquibase;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void runLiquibaseAfterHibernate() throws Exception {

        SpringLiquibase liquibase = liquibase();
        liquibase.setShouldRun(true);
        liquibase.afterPropertiesSet();

    }

}
