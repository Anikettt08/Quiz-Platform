# Quiz Platform API Conventions

## API Version

All API endpoints use:

/api/v1

## Authentication

Protected endpoints use JWT authentication.

Authorization header:

Authorization: Bearer <JWT_TOKEN>

## Resource Naming

Use plural nouns for resources.

Examples:

/users
/quizzes
/questions
/results

## HTTP Methods

GET    = Retrieve data
POST   = Create data
PUT    = Update data
PATCH  = Partially update data
DELETE = Delete data

## Authentication Endpoints

POST /api/v1/auth/register
POST /api/v1/auth/login

## User Endpoints

GET /api/v1/users/me
GET /api/v1/users/{user_id}

## Quiz Endpoints

GET /api/v1/quizzes
POST /api/v1/quizzes
GET /api/v1/quizzes/{quiz_id}
PUT /api/v1/quizzes/{quiz_id}
DELETE /api/v1/quizzes/{quiz_id}

## Question Endpoints

GET /api/v1/quizzes/{quiz_id}/questions
POST /api/v1/quizzes/{quiz_id}/questions
PUT /api/v1/questions/{question_id}
DELETE /api/v1/questions/{question_id}

## Result Endpoints

POST /api/v1/results
GET /api/v1/results/{result_id}
GET /api/v1/users/me/results