package com.loadtest.loadtestserver;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ThreadLocalRandom;

@RestController
public class TestController {

    @GetMapping("/first")
    public String first() throws InterruptedException {
        delay();

        return "{\"id\":122333}";
    }

    @GetMapping("/second")
    public String second(@RequestParam int id) throws InterruptedException {
        delay();

        return "{\"message\":\"Second endpoint received id = " + id + "\"}";
    }

    @GetMapping("/third")
    public String third(@RequestParam int id) throws InterruptedException {
        delay();

        return "{\"message\":\"Third endpoint received id = " + id + "\"}";
    }

    private void delay() throws InterruptedException {
        long delay = ThreadLocalRandom.current().nextLong(500, 1501);
        Thread.sleep(delay);
    }
}