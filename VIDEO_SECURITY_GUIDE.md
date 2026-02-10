# Video Security Implementation Guide

## 🔒 Overview

This guide explains the comprehensive video security system implemented to protect video content from unauthorized access, screen recording, downloading, and other security threats.

## 🛡️ Security Features Implemented

### 1. **Token-Based Authentication**
- Each video request requires a secure token
- Tokens are time-limited (default: 1 hour expiry)
- Tokens are user-specific and course-specific
- Backend validates tokens before serving video content

### 2. **Download Prevention**
- ✅ Right-click context menu disabled
- ✅ Keyboard shortcuts disabled (Ctrl+S, Ctrl+U, F12)
- ✅ Drag and drop disabled
- ✅ Text selection disabled
- ✅ Video controls download disabled
- ✅ Picture-in-Picture disabled

### 3. **Screen Recording Detection**
- ✅ DevTools detection (monitors window size changes)
- ✅ Tab visibility monitoring (detects when tab is hidden)
- ✅ Canvas capture detection
- ✅ MediaRecorder API monitoring
- ✅ Screen sharing detection (getDisplayMedia)

### 4. **Watermarking**
- Dynamic watermark with user ID
- Visible watermark overlay
- Invisible watermark in video stream (backend implementation)
- Prevents unauthorized sharing

### 5. **Access Control**
- Course enrollment verification
- User authentication required
- Domain restrictions (backend implementation)
- IP-based access logging

### 6. **Security Violation Reporting**
- Automatic violation detection
- Backend reporting system
- Video pause on violation detection
- User notification system

---

## 📁 File Structure

```
src/
├── components/
│   └── Video/
│       └── SecureVideoPlayer.tsx    # Main secure video player component
├── utils/
│   └── videoSecurity.ts             # Security utility functions
├── services/
│   └── api.ts                       # API client with video security endpoints
└── config/
    └── api.ts                       # API endpoint configuration
```

---

## 🔧 Implementation Details

### SecureVideoPlayer Component

**Location**: `src/components/Video/SecureVideoPlayer.tsx`

**Features**:
- Custom video player with security controls
- Token-based video URL generation
- Real-time security monitoring
- Watermark overlay
- Progress tracking
- Completion callbacks

**Usage**:
```tsx
<SecureVideoPlayer
  lessonId="lesson-123"
  courseId="course-456"
  videoUrl="https://cdn.example.com/video.mp4"
  title="Lesson Title"
  onProgress={(progress) => console.log(progress)}
  onComplete={() => console.log('Completed')}
/>
```

### Video Security Utilities

**Location**: `src/utils/videoSecurity.ts`

**Functions**:
- `detectDevTools()` - Detects if browser DevTools is open
- `detectScreenRecording()` - Detects screen recording attempts
- `addWatermark()` - Adds watermark to video
- `preventVideoDownload()` - Prevents video download
- `monitorSecurityViolations()` - Monitors for security violations
- `generateSecureVideoUrl()` - Generates secure video URL with token
- `validateVideoToken()` - Validates video access token

---

## 🔌 Backend API Requirements

### 1. Get Secure Video Token

**Endpoint**: `GET /api/video/secure-token/:lessonId?courseId=:courseId`

**Headers**:
```
Authorization: Bearer <user_token>
```

**Response**:
```json
{
  "success": true,
  "data": {
    "token": "encrypted_token_string",
    "watermark": "User: user@example.com",
    "expiresAt": "2024-01-15T12:00:00Z"
  }
}
```

**Backend Implementation Requirements**:
- Verify user enrollment in course
- Generate time-limited token (1 hour expiry)
- Include user ID in watermark
- Log access attempt
- Return encrypted token

### 2. Report Security Violation

**Endpoint**: `POST /api/video/security-violation/:lessonId`

**Headers**:
```
Authorization: Bearer <user_token>
```

**Request Body**:
```json
{
  "reason": "DevTools detected",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Backend Implementation Requirements**:
- Log security violation
- Associate with user account
- Track violation patterns
- Implement rate limiting
- Optionally suspend access after multiple violations

### 3. Video Streaming Endpoint

**Endpoint**: `GET /api/video/stream/:lessonId`

**Headers**:
```
Authorization: Bearer <user_token>
token: <video_token>
```

**Query Parameters**:
- `token` - Video access token
- `expires` - Token expiry timestamp
- `t` - Current timestamp (prevents caching)

**Backend Implementation Requirements**:
- Validate video token
- Check token expiry
- Verify user enrollment
- Stream video with proper headers:
  ```
  Content-Type: video/mp4
  Content-Disposition: inline; filename="video.mp4"
  X-Content-Type-Options: nosniff
  Cache-Control: no-store, no-cache, must-revalidate
  ```
- Implement range requests for video seeking
- Add CORS headers if needed
- Log video access

---

## 🎥 Video Hosting Recommendations

### Option 1: Cloud Storage with Signed URLs (Recommended)

**Services**: AWS S3, Google Cloud Storage, Azure Blob Storage

**Implementation**:
- Store videos in private cloud storage
- Generate signed URLs with expiration
- Implement token validation
- Use CDN for better performance

**Example (AWS S3)**:
```javascript
// Backend
const s3 = new AWS.S3();
const params = {
  Bucket: 'your-bucket',
  Key: `videos/${lessonId}.mp4`,
  Expires: 3600, // 1 hour
};
const signedUrl = s3.getSignedUrl('getObject', params);
```

### Option 2: Video Streaming Service

**Services**: 
- **Vimeo** (with privacy settings)
- **Wistia** (with domain restrictions)
- **JW Player** (with DRM)
- **Mux** (with token authentication)

**Features to Enable**:
- Domain restrictions
- Token authentication
- Download prevention
- Watermarking
- Analytics

### Option 3: Self-Hosted with DRM

**Technologies**:
- **HLS.js** with token authentication
- **Shaka Player** with DRM
- **Video.js** with security plugins

**Implementation**:
- Encrypt videos server-side
- Implement token-based authentication
- Use DRM for maximum security
- Add watermarking

---

## 🔐 Additional Security Measures

### 1. Domain Restrictions

**Backend Implementation**:
```javascript
// Check referer header
const allowedDomains = ['https://yourdomain.com', 'https://www.yourdomain.com'];
const referer = req.headers.referer;
if (!allowedDomains.some(domain => referer?.startsWith(domain))) {
  return res.status(403).json({ error: 'Access denied' });
}
```

### 2. IP Whitelisting (Optional)

For maximum security, implement IP whitelisting:
```javascript
const allowedIPs = ['user_ip_1', 'user_ip_2'];
if (!allowedIPs.includes(req.ip)) {
  return res.status(403).json({ error: 'IP not authorized' });
}
```

### 3. Rate Limiting

Prevent abuse with rate limiting:
```javascript
// Limit video requests per user
const rateLimit = require('express-rate-limit');
const videoLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per window
});
```

### 4. Video Encryption

**Server-Side Encryption**:
- Encrypt videos before storage
- Decrypt on-the-fly during streaming
- Use AES-256 encryption
- Store encryption keys securely

### 5. Watermarking

**Backend Implementation**:
```javascript
// Add watermark using FFmpeg
const ffmpeg = require('fluent-ffmpeg');
ffmpeg(inputVideo)
  .videoFilters(`drawtext=text='${watermark}':fontcolor=white@0.5:x=10:y=10`)
  .output(outputVideo)
  .run();
```

---

## 🚀 Integration Steps

### Step 1: Update Backend API

1. Implement secure video token endpoint
2. Implement security violation reporting endpoint
3. Implement video streaming endpoint with token validation
4. Add watermarking to videos
5. Set up video storage (cloud or self-hosted)

### Step 2: Configure Frontend

1. Install dependencies (if needed):
```bash
npm install
```

2. Update API base URL in `.env`:
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

3. The SecureVideoPlayer component is already integrated in LessonPlayer

### Step 3: Test Security Features

1. **Test Download Prevention**:
   - Try right-clicking video
   - Try Ctrl+S
   - Try dragging video
   - All should be blocked

2. **Test Screen Recording Detection**:
   - Open DevTools while video is playing
   - Video should pause and show warning

3. **Test Token Expiry**:
   - Wait for token to expire (1 hour)
   - Video should stop playing
   - User should need to refresh token

---

## 📊 Monitoring & Analytics

### Security Violations Logging

Track all security violations:
- DevTools detection
- Screen recording attempts
- Unauthorized access attempts
- Token misuse
- Multiple device access

### User Activity Tracking

Monitor user behavior:
- Video watch time
- Completion rates
- Access patterns
- Device information
- IP addresses

---

## ⚠️ Limitations & Considerations

### Known Limitations

1. **Client-Side Security**: 
   - Frontend security can be bypassed by determined users
   - Always implement server-side validation

2. **Screen Recording**:
   - Cannot completely prevent screen recording
   - Can detect and log attempts
   - Watermarking helps identify source

3. **Download Prevention**:
   - Cannot prevent all download methods
   - Network traffic can be captured
   - Focus on making it difficult, not impossible

### Best Practices

1. **Always validate on backend** - Never trust client-side checks alone
2. **Use HTTPS** - Encrypt all video traffic
3. **Implement DRM** - For maximum security, use DRM solutions
4. **Monitor violations** - Track and respond to security violations
5. **Regular updates** - Keep security measures updated
6. **User education** - Inform users about security policies

---

## 🔄 Future Enhancements

### Planned Features

1. **DRM Integration**:
   - Widevine DRM
   - FairPlay DRM
   - PlayReady DRM

2. **Advanced Watermarking**:
   - Invisible watermarks
   - Forensic watermarks
   - Dynamic watermarks

3. **Machine Learning Detection**:
   - Anomaly detection
   - Pattern recognition
   - Automated threat detection

4. **Multi-Device Management**:
   - Device registration
   - Concurrent session limits
   - Device-based access control

---

## 📝 Legal Considerations

1. **Terms of Service**: Include video security policies in ToS
2. **Privacy Policy**: Disclose security monitoring
3. **User Consent**: Obtain consent for security measures
4. **Data Protection**: Comply with GDPR, CCPA, etc.

---

## 🆘 Troubleshooting

### Video Not Loading

1. Check token validity
2. Verify user enrollment
3. Check backend logs
4. Verify CORS settings
5. Check network connectivity

### Security Violations False Positives

1. Adjust detection thresholds
2. Whitelist legitimate tools
3. Improve detection logic
4. User feedback mechanism

### Performance Issues

1. Optimize video encoding
2. Use CDN for delivery
3. Implement caching strategies
4. Monitor server resources

---

## 📚 Resources

- [MDN Web APIs - MediaRecorder](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder)
- [W3C Encrypted Media Extensions](https://www.w3.org/TR/encrypted-media/)
- [Video.js Security](https://videojs.com/)
- [HLS.js Documentation](https://github.com/video-dev/hls.js/)

---

*Last Updated: 2026*

