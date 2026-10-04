import http from 'k6/http';
import { Trend, Rate, Counter } from 'k6/metrics';

const firstResponseTime = new Trend('first_response_time');
const firstErrors = new Rate('first_errors');
const firstRequests = new Counter('first_requests');

const secondResponseTime = new Trend('second_response_time');
const secondErrors = new Rate('second_errors');
const secondRequests = new Counter('second_requests');

const thirdResponseTime = new Trend('third_response_time');
const thirdErrors = new Rate('third_errors');
const thirdRequests = new Counter('third_requests');

export const options = {
    scenarios: {
        first_second: {
            executor: 'constant-arrival-rate',
            rate: 20,
            timeUnit: '1s',
            duration: '30s',

            preAllocatedVUs: 50,
            maxVUs: 100,

            exec: 'firstThenSecond',
        },
        first_third: {
            executor: 'constant-arrival-rate',
            rate: 10,
            timeUnit: '1s',
            duration: '30s',

            preAllocatedVUs: 50,
            maxVUs: 100,

            exec: 'firstThenThird',
        },
    },
    summaryTrendStats: [
        'avg',
        'min',
        'med',
        'p(90)',
        'p(95)',
        'p(99)',
        'max',
    ],
};

export function firstThenSecond() {
    const firstResponse = http.get('http://localhost:8080/first');

    firstRequests.add(1);
    firstResponseTime.add(firstResponse.timings.duration);
    firstErrors.add(firstResponse.status !== 200);

    if (firstResponse.status === 200) {

        const data = firstResponse.json();
        const id = data.id;

        const secondResponse = http.get(`http://localhost:8080/second?id=${id}`);

        secondRequests.add(1);
        secondResponseTime.add(secondResponse.timings.duration);
        secondErrors.add(secondResponse.status !== 200);
    }
}

export function firstThenThird() {
    const firstResponse = http.get('http://localhost:8080/first');

    firstRequests.add(1);
    firstResponseTime.add(firstResponse.timings.duration);
    firstErrors.add(firstResponse.status !== 200);

    if (firstResponse.status === 200) {

        const data = firstResponse.json();
        const id = data.id;

        const thirdResponse = http.get(`http://localhost:8080/third?id=${id}`);

        thirdRequests.add(1);
        thirdResponseTime.add(thirdResponse.timings.duration);
        thirdErrors.add(thirdResponse.status !== 200);
    }
}
