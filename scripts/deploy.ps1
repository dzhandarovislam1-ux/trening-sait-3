# Automated deploy script for Timeweb FTP
$configPath = Join-Path $PSScriptRoot "..\.deploy-config.json"
if (-not (Test-Path $configPath)) {
    Write-Error "Config file not found: $configPath"
    exit 1
}

$cfg = Get-Content $configPath -Raw | ConvertFrom-Json
$baseFtp = "ftp://$($cfg.host)/$($cfg.remoteDir)"
$cred = New-Object System.Net.NetworkCredential($cfg.user, $cfg.pass)
$localRoot = (Resolve-Path (Join-Path $PSScriptRoot "..\$($cfg.localDir)")).Path

Write-Host "Deploying from $localRoot to $baseFtp..." -ForegroundColor Cyan

$createdDirs = New-Object "System.Collections.Generic.HashSet[string]"

function Ensure-FtpDir($relDir) {
    if ([string]::IsNullOrWhiteSpace($relDir) -or $relDir -eq ".") { return }
    $parts = $relDir -replace "\\", "/" -split "/"
    $curr = ""
    foreach ($p in $parts) {
        if ([string]::IsNullOrWhiteSpace($p)) { continue }
        $curr = if ($curr) { "$curr/$p" } else { $p }
        if (-not $createdDirs.Contains($curr)) {
            $url = "$baseFtp/$curr/"
            try {
                $req = [System.Net.FtpWebRequest]::Create($url)
                $req.Credentials = $cred
                $req.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                $null = $req.GetResponse()
            } catch [System.Net.WebException] {
                # Directory already exists or can't be created
            }
            $createdDirs.Add($curr) | Out-Null
        }
    }
}

$wc = New-Object System.Net.WebClient
$wc.Credentials = $cred

$files = Get-ChildItem -Path $localRoot -Recurse -File
$count = $files.Count
$idx = 0

foreach ($f in $files) {
    $idx++
    $relPath = $f.FullName.Substring($localRoot.Length + 1)
    $relDir = [System.IO.Path]::GetDirectoryName($relPath)
    
    Ensure-FtpDir $relDir
    
    $urlPath = ($relPath -replace "\\", "/")
    $targetUrl = "$baseFtp/$urlPath"
    
    Write-Host "[$idx/$count] Uploading $urlPath..." -ForegroundColor Gray
    try {
        $wc.UploadFile($targetUrl, $f.FullName) | Out-Null
    } catch {
        Write-Warning ("Failed to upload " + $urlPath + ": " + $_)
    }
}

# Also upload the main zip archive
$zipPath = (Join-Path $PSScriptRoot "..\novyterek-site.zip")
if (Test-Path $zipPath) {
    Write-Host "Uploading novyterek-site.zip..." -ForegroundColor Cyan
    $wc.UploadFile("$baseFtp/novyterek-site.zip", $zipPath) | Out-Null
}

Write-Host "Deployment completed successfully! All $count files updated." -ForegroundColor Green
