## Testing

### Prepare Release
```
use .env not .env.local for building a release so test server urls get used instead of your local
npm run build
zip build folder to build.zip
create a new release on GitHub release page and upload build.zip.
```

### Test Extension
```
download new release from GitHub
decompress zip file from build.zip to build folder
Chrome extensions > Load unpacked > build folder
test the extension
```
