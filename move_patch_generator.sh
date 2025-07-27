#!/usr/bin/env bash

echo "*** Begin Patch"
# Move controllers
git ls-files 'backend/src/controllers/**/*.js' | while read f; do
  rel=${f#backend/src/controllers/}
  feat=${rel%%/*}
  subpath=${rel#*/}
  echo "*** Update File: $f"
  echo "*** Move to: backend/src/features/$feat/controllers/$subpath"
  echo
 done
# Move services
git ls-files 'backend/src/services/**/*.js' | while read f; do
  rel=${f#backend/src/services/}
  feat=${rel%%/*}
  subpath=${rel#*/}
  echo "*** Update File: $f"
  echo "*** Move to: backend/src/features/$feat/services/$subpath"
  echo
 done
# Move models except util
git ls-files 'backend/src/models/**/*.js' | while read f; do
  rel=${f#backend/src/models/}
  feat=${rel%%/*}
  if [ "$feat" = "util" ]; then
    continue
  fi
  subpath=${rel#*/}
  echo "*** Update File: $f"
  echo "*** Move to: backend/src/features/$feat/models/$subpath"
  echo
 done
# Move top-level routes
for f in backend/src/routes/*.js; do
  fname=$(basename "$f" .routes.js)
  echo "*** Update File: $f"
  echo "*** Move to: backend/src/features/$fname/routes.js"
  echo
 done
# Move users routes
git ls-files 'backend/src/routes/users/**/*.js' | while read f; do
  rel=${f#backend/src/routes/users/}
  echo "*** Update File: $f"
  echo "*** Move to: backend/src/features/users/routes/$rel"
  echo
 done
# Delete jsconfig.json
echo "*** Delete File: backend/jsconfig.json"
echo
# Add type module to package.json
echo "*** Update File: backend/package.json"
echo "@@"
echo "  \"type\": \"module\","
echo
# End patch content
echo "*** End Patch"
