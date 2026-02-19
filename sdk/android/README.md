# Android SDK for VideoShare Platform

## Installation

### Gradle

Add to your `build.gradle`:

```gradle
dependencies {
    implementation 'com.videoshare:sdk:1.0.0'
}
```

### Maven

```xml
<dependency>
    <groupId>com.videoshare</groupId>
    <artifactId>sdk</artifactId>
    <version>1.0.0</version>
</dependency>
```

## Quick Start

### Initialize SDK

```kotlin
import com.videoshare.sdk.VideoShareSDK
import com.videoshare.sdk.VideoShareConfig

// Configure the SDK
val config = VideoShareConfig(
    apiKey = "your-api-key",
    apiSecret = "your-api-secret",
    baseUrl = "https://api.videoshare.com"
)

VideoShareSDK.configure(this, config)
```

### Authentication

```kotlin
// Login
VideoShareSDK.auth.login(
    email = "user@example.com",
    password = "password"
) { result ->
    result.onSuccess { user ->
        println("Logged in as ${user.name}")
    }.onFailure { error ->
        println("Login failed: ${error.message}")
    }
}

// Logout
VideoShareSDK.auth.logout { result ->
    // Handle logout
}
```

### Upload Video

```kotlin
val videoFile = File("/path/to/video.mp4")

val uploadRequest = VideoUploadRequest(
    title = "My Video",
    description = "Video description",
    videoFile = videoFile,
    thumbnailFile = thumbnailFile
)

VideoShareSDK.videos.upload(uploadRequest,
    onProgress = { progress ->
        println("Upload progress: $progress%")
    },
    onComplete = { result ->
        result.onSuccess { video ->
            println("Video uploaded: ${video.id}")
        }.onFailure { error ->
            println("Upload failed: ${error.message}")
        }
    }
)
```

### Play Video

```kotlin
import com.videoshare.sdk.player.VideoPlayerView

// In your layout
<com.videoshare.sdk.player.VideoPlayerView
    android:id="@+id/videoPlayer"
    android:layout_width="match_parent"
    android:layout_height="wrap_content" />

// In your Activity/Fragment
val videoPlayer = findViewById<VideoPlayerView>(R.id.videoPlayer)
videoPlayer.loadVideo("video-id-here")
videoPlayer.play()
```

### List Videos

```kotlin
VideoShareSDK.videos.list(
    limit = 20,
    offset = 0
) { result ->
    result.onSuccess { videos ->
        println("Found ${videos.size} videos")
    }.onFailure { error ->
        println("Failed to fetch videos: ${error.message}")
    }
}
```

### Search Videos

```kotlin
VideoShareSDK.videos.search(
    query = "tutorial",
    limit = 10
) { result ->
    result.onSuccess { videos ->
        // Display search results
    }.onFailure { error ->
        println("Search failed: ${error.message}")
    }
}
```

### WebSocket Real-time

```kotlin
// Connect to WebSocket
VideoShareSDK.realtime.connect()

// Join video room
VideoShareSDK.realtime.joinVideoRoom("video-id")

// Listen for messages
VideoShareSDK.realtime.onMessage { message ->
    println("New message: ${message.content}")
}

// Send message
VideoShareSDK.realtime.sendMessage(
    videoId = "video-id",
    content = "Hello!"
)
```

## API Reference

### Authentication

```kotlin
// Login
suspend fun login(email: String, password: String): Result<User>

// Register
suspend fun register(email: String, password: String, name: String): Result<User>

// Logout
suspend fun logout(): Result<Unit>

// Get current user
fun currentUser(): User?
```

### Videos

```kotlin
// Upload video
fun upload(
    request: VideoUploadRequest,
    onProgress: (Double) -> Unit,
    onComplete: (Result<Video>) -> Unit
)

// List videos
suspend fun list(limit: Int, offset: Int): Result<List<Video>>

// Get video
suspend fun get(id: String): Result<Video>

// Search videos
suspend fun search(query: String, limit: Int): Result<List<Video>>

// Delete video
suspend fun delete(id: String): Result<Unit>
```

### Player

```kotlin
// Play video
fun play()

// Pause
fun pause()

// Seek
fun seekTo(timeMs: Long)

// Set playback speed
fun setPlaybackSpeed(speed: Float)

// Get current position
fun getCurrentPosition(): Long

// Get duration
fun getDuration(): Long
```

## Models

### User

```kotlin
data class User(
    val id: String,
    val email: String,
    val name: String?,
    val role: String,
    val createdAt: Date
)
```

### Video

```kotlin
data class Video(
    val id: String,
    val title: String,
    val description: String?,
    val url: String,
    val thumbnailUrl: String?,
    val duration: Int,
    val views: Int,
    val likes: Int,
    val status: String,
    val createdAt: Date
)
```

## Error Handling

```kotlin
sealed class VideoShareError : Exception() {
    object Unauthorized : VideoShareError()
    object NotFound : VideoShareError()
    data class NetworkError(val cause: Throwable) : VideoShareError()
    object InvalidResponse : VideoShareError()
    data class UploadFailed(override val message: String) : VideoShareError()
}
```

## Requirements

- Android 6.0 (API level 23) or higher
- Kotlin 1.6+
- AndroidX

## ProGuard

```proguard
-keep class com.videoshare.sdk.** { *; }
-dontwarn com.videoshare.sdk.**
```

## License

MIT License
