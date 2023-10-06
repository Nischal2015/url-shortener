# URL Shortener

## Overview

This project presents a URL shortening application that efficiently converts lengthy URLs into concise links. The core functionality securely stores shortened URLs in DynamoDB, enabling easy retrieval of the original URLs. AWS Lambda functions, powered by [Lambda Powertools](https://docs.powertools.aws.dev/lambda/python/latest/), ensure efficiency and reliability.

## Architecture Overview

![URL Shortener Architecture](https://github.com/Nischal2015/url-shortener/blob/media/Serverless%20Architectures%20-%20URL%20Shortener.jpeg?raw=true)

This document provides an in-depth overview of the architecture underpinning our URL shortening and retrieval system. Our system emphasizes efficiency and scalability and leverages key AWS services to offer a seamless user experience. The fundamental components of this architecture are the API Gateway, Lambda function, and DynamoDB, each serving crucial roles in the system's operation.

### API Gateway

The API gateway serves as the entry point for interactions with our system. It functions as the interface through which users submit long URLs for shortening and request original URLs based on short links. The API Gateway efficiently routes and manages these requests, ensuring they reach the appropriate components within the system.

### Lambda Function for URL Management

The Lambda function, integrated with Lambda Powertools, is the core component responsible for handling URL shortening and retrieval processes.

**URL Shortening:** This Lambda function promptly generates a shortened URL when a long URL needs to be condensed. It securely stores the short URL in DynamoDB, guaranteeing data confidentiality and integrity through IAM roles.

**URL Retrieval:** Similarly, when a short URL is submitted for retrieval of the original link, the Lambda function queries DynamoDB to locate and return the corresponding long URL. This process is both rapid and secure, maintaining the efficiency and integrity of the system.

### DynamoDB

DynamoDB acts as the database backbone of our system. It stores essential URL mappings and manages Time-to-Live (TTL) values, functioning as a digital timekeeper for the system.

**TTL Management:** DynamoDB automatically removes expired short URLs from the database using TTL, ensuring that the database remains clutter-free and optimized for efficiency.

**IAM Roles:** IAM roles function as access control mechanisms, ensuring that only authorized individuals can access specific resources within the system, enhancing security and data protection.

## Getting Started

**This section will be described later.**
