$pptx = (Resolve-Path 'BigSam_Steganography_Internal_Defense_Presentation.pptx').Path
$pp = $null
$pres = $null
try { $pp = New-Object -ComObject PowerPoint.Application; $pres = $pp.Presentations.Open($pptx, $true, $false, $false); Write-Output "opened $($pres.Slides.Count)"; $pres.Close(); $pp.Quit() } catch { Write-Error $_; if ($pres -ne $null) { $pres.Close() }; if ($pp -ne $null) { $pp.Quit() }; exit 1 }
