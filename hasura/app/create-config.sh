while getopts s:c: flag
do
    case "${flag}" in
        s) secret=${OPTARG};;
        c) config_id=${OPTARG};;
    esac
done

curl --location --request POST "https://us-central1-token-ocean-admin.cloudfunctions.net/getConfig/app/$config_id" \
--header "auth-secret: $secret" \
--data-raw '{
  "test": "yes"
}' -o config.js
