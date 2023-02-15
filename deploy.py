import os

os.chdir('./frontend')

with open('src/components/Footer.js', 'r') as f:
  filedata = f.read()
version_line = [line.strip() for line in filedata.split('\n') if "Version" in line][0]
version = version_line.split(' ')[1]
new_version = version.split('.')[0] + '.' + version.split('.')[1] + '.' + str(int(version.split('.')[2]) + 1)
new_version_line = version_line.replace(version, new_version)
filedata = filedata.replace(version_line, new_version_line)
with open('src/components/Footer.js', 'w') as f:
  f.write(filedata)

print('[+] Starting to build frontend in production mode...')
os.system('npm run build')
print('[+] Build finished.')
print('[+] Firebase login...')
os.system('firebase login')
print('[+] Firebase deploy...')
os.system('firebase deploy --only hosting')
print('[+] Firebase deploy finished.')

print('[+] Starting to build backend in production mode...')
print('[+] Staging changes...')
os.system('git add .')
print('[+] Committing changes...')
os.system(f'git commit -m "Commit by deploy.py - version: {new_version}"')
print('[+] Pushing changes...')
os.system('git push')
print('[+] Build finished.')
print('[+] Deploy finished.')
