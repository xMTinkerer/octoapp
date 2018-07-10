#!/bin/bash
end=$(($SECONDS+$1))
while [[ "$SECONDS" -lt "$end" ]]; do
    continue
done