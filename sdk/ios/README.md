# iOS SDK for VideoShare Platform

## Installation

### CocoaPods

Add to your `Podfile`:

```ruby
pod 'VideoShareSDK', '~> 1.0.0'
```

### Swift Package Manager

Add to your `Package.swift`:

```swift
dependencies: [
    .package(url: "https://github.com/your-org/videoshare-ios-sdk.git", from: "1.0.0")
]
```

## Quick Start

### Initialize SDK

```swift
import VideoShareSDK

// Configure the SDK
let config = VideoShareConfig(
    apiKey: "your-api-key",
    apiSecret: "your-api-secret",
    baseURL: "https://api.videoshare.com"
)

VideoShareSDK.configure(with: config)
```

### Authentication

```swift
// Login
VideoShareSDK.shared.auth.login(
    email: "user@example.com",
    password: "password"
) { result in
    switch result {
    case .success(let user):
        print("Logged in as \(user.name)")
    case .failure(let error):
        print("Login failed: \(error)")
    }
}

// Logout
VideoShareSDK.shared.auth.logout { result in
    // Handle logout
}
```

### Upload Video

```swift
let videoURL = URL(fileURLWithPath: "/path/to/video.mp4")

let uploadRequest = VideoUploadRequest(
    title: "My Video",
    description: "Video description",
    videoURL: videoURL,
    thumbnailURL: thumbnailURL
)

VideoShareSDK.shared.videos.upload(uploadRequest) { progress in
    print("Upload progress: \(progress)%")
} completion: { result in
    switch result {
    case .success(let video):
        print("Video uploaded: \(video.id)")
    case .failure(let error):
        print("Upload failed: \(error)")
    }
}
```

### Play Video

```swift
import AVKit

let playerViewController = VideoSharePlayerViewController()
playerViewController.videoID = "video-id-here"
present(playerViewController, animated: true)
```

### List Videos

```swift
VideoShareSDK.shared.videos.list(
    limit: 20,
    offset: 0
) { result in
    switch result {
    case .success(let videos):
        print("Found \(videos.count) videos")
    case .failure(let error):
        print("Failed to fetch videos: \(error)")
    }
}
```

### Search Videos

```swift
VideoShareSDK.shared.videos.search(
    query: "tutorial",
    limit: 10
) { result in
    switch result {
    case .success(let videos):
        // Display search results
    case .failure(let error):
        print("Search failed: \(error)")
    }
}
```

### WebSocket Real-time

```swift
// Connect to WebSocket
VideoShareSDK.shared.realtime.connect()

// Join video room
VideoShareSDK.shared.realtime.joinVideoRoom(videoID: "video-id")

// Listen for messages
VideoShareSDK.shared.realtime.onMessage { message in
    print("New message: \(message.content)")
}

// Send message
VideoShareSDK.shared.realtime.sendMessage(
    videoID: "video-id",
    content: "Hello!"
)
```

## API Reference

### Authentication

```swift
// Login
func login(email: String, password: String, completion: @escaping (Result<User, Error>) -> Void)

// Register
func register(email: String, password: String, name: String, completion: @escaping (Result<User, Error>) -> Void)

// Logout
func logout(completion: @escaping (Result<Void, Error>) -> Void)

// Get current user
func currentUser() -> User?
```

### Videos

```swift
// Upload video
func upload(_ request: VideoUploadRequest, progress: @escaping (Double) -> Void, completion: @escaping (Result<Video, Error>) -> Void)

// List videos
func list(limit: Int, offset: Int, completion: @escaping (Result<[Video], Error>) -> Void)

// Get video
func get(id: String, completion: @escaping (Result<Video, Error>) -> Void)

// Search videos
func search(query: String, limit: Int, completion: @escaping (Result<[Video], Error>) -> Void)

// Delete video
func delete(id: String, completion: @escaping (Result<Void, Error>) -> Void)
```

### Player

```swift
// Play video
func play(videoID: String)

// Pause
func pause()

// Seek
func seek(to time: TimeInterval)

// Set playback rate
func setPlaybackRate(_ rate: Float)
```

## Models

### User

```swift
struct User {
    let id: String
    let email: String
    let name: String?
    let role: String
    let createdAt: Date
}
```

### Video

```swift
struct Video {
    let id: String
    let title: String
    let description: String?
    let url: String
    let thumbnailURL: String?
    let duration: Int
    let views: Int
    let likes: Int
    let status: String
    let createdAt: Date
}
```

## Error Handling

```swift
enum VideoShareError: Error {
    case unauthorized
    case notFound
    case networkError(Error)
    case invalidResponse
    case uploadFailed(String)
}
```

## Requirements

- iOS 14.0+
- Swift 5.5+
- Xcode 13.0+

## License

MIT License
