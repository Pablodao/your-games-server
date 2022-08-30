# YOUR GAMES

## Description

Basic app for review videogames

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start saving favorite videogames
- **Login:** As a user I can login to the platform so that I can see all the games
- **Logout:** As a user I can logout from the platform so no one else can use it
- **Set a valoration to a game** As a user I can let my valoration so others users can view oh good rate is a game
- **Comment** As a user I want to let my review of a game
- **Add to favorites** As a user I want to add a restaurant to favorite so that I can save the games that I liked the most
- **See my favorites** As a user I want to see my favorite games so that I can see the ones I liked the most

## Backlog

User profile:

- Game finder
- Show like and dislike quantity
- Block user acc

# Client

## Routes

# Backend

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /api/apiCall" - get all games from the api
- /api/apiCall/details/:gameId - get game details from api
- "/api/comments/:gameId" => List all comments of a game
- "/api/comments/user/:userId" => List all comment of a user
- "/api/comments/:gameId" => Add one comment to the DB
- "/api/comments/:commentId" => Edit one comment from the DB
- "/api/comments/:commentId/like" => like a comment
- "/api/comments/:commentId/dislike" => displike a comment
- "/api/games/:gameId/comment" => Delete one comment from the DB
- "/api/profile/favourites/:gameId" => Add a game to user favourite games
- "/api/profile/favourites" => find user's favourite games
- "/api/profile/:id" => Find user in DB
- "/api/profile/:id/edit" => Edit user in DB
- POST "/api/games/:gameId" => Add one game valoration to the DB
- GET "/api/games/:gameId" => Find user game valoration in the DB
- GET "/api/games/:gameId/valorations" => Find all valorations of a game
- PATCH "api/games/:gameId" => Edit one valoration of a game
- 404

# Frontend

- "/" => Home page
- "/signup" => Signup form
- "/login" => Login form
- "/games" => Game list
- "/games/:gameId" => Game details
- "/profile/:userId" => User profile

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Games List Page (private)
-
- Game Detail Page (private)
- User Profile Page (private)
- 404 Page (public)

## Components

- Comment
- Comment input
- Edit profile form
- Navbar
- StarRating

## IO

## Services

- Api Service

  - gameListService
  - gameDetailsService

- Auth Service

  - signupService
  - loginService
  - verifyService

- User Service

  - findOneUserService
  - editUserService
  - blockUserAccount
  - userFavouriteGames
  - favouriteGameService

- Comment Service

  - newCommentService
  - findCommentService
  - findUserCommentsService
  - deleteCommentService
  - editCommentService
  - likeCommentService
  - dislikeCommentService

- Upload Service

  - uploadService

- Auth Service
  - newGameValorationService
  - userGameValorationService
  - allGameValorationService
  - editGameValorationService

# Server

## Models

User model

```
 {
    username: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,

      unique: true,
      require: true,
    },

    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    description: String,
    rank: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
    favourites: [
      {
        gameImg: String,
        gameName: String,
        gameId: String,
      },
    ],
    likedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    dislikedComments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    accountClosed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
```

Game model

```
{
    valoration: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    apiId: {
      type: String,
      require: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
```

Comment model

```
{
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    game: {
      type: String,
      required: true,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
```



## Links



### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/Pablodao/your-games-client)
[Server repository Link](https://github.com/Pablodao/your-games-server)

[Deploy Link](https://your-games.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1QT63XesKH9VBbNBMv2emxAJnPLbSOd6PTRR5wjp0r4A/edit#slide=id.gc6f80d1ff_0_66)
