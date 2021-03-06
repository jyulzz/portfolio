# /*-----------------------------------------------------------------------------*

# FILE
# .build.zsh

# DESCRIPTION
# ZSH Script to run 'gatsby build' process on project

# *-----------------------------------------------------------------------------*/

#!/bin/zsh
sudo clear
echo "\n\033[1;49;33mBUILD.ZSH:\033[1;32m a ZSH script to \033[49;33mBUILD\033[1;32m a \033[49;33mPROD\033[1;32muction version of this project."
echo "\n\033[1;35m1. Update dependencies:\033[0m\n"
ncu -u
echo "\n\033[1;35m2. Install:\033[0m\n"
npm install
echo "\n\033[1;35m3. Audit Vulnerabilities:\033[0m\n"
npm audit
echo "\n\033[1;35m4. Fix Vulnerabilities:\033[0m\n"
npm audit fix
echo "\n\033[1;35m5. Clean:\033[0m\n"
sudo gatsby clean
echo "\n\033[1;35m6. Prettier:\033[0m\n"
sudo prettier --write "**/*.{js,jsx,json,yml}"
echo "\n\033[1;35m7. Build:\033[0m\n"
sudo gatsby build
echo "\n\033[1;35mBuild: DONE\033[0m\n"
