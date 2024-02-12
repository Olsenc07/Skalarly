# Build Frontend SSR & static assets
FROM node:20.10.0 as frontend-build

WORKDIR /app/frontend

COPY skalarly-frontend/package*.json ./

RUN npm install 

COPY skalarly-frontend/ ./

RUN npm run build:ssr


# Build Backend
FROM node:20.10.0 as backend-build

WORKDIR /app/backend

COPY backend/package*.json ./

RUN npm install --only=production

COPY backend/ ./

# Set up the production environment
FROM node:20.10.0
WORKDIR /app
# Copy backend
COPY --from=backend-build /app/backend /app/backend
COPY --from=backend-build /app/backend/node_modules /app/backend/node_modules
#Copy SSR
COPY --from=frontend-build /app/frontend/dist /app/backend/public
COPY --from=frontend-build /app/frontend/dist/skalarly-fs /app/backend/dist

EXPOSE 3000

ENV NODE_ENV production

# Start the server with SSR
CMD ["node", "backend/dist/skalarly-fs/server/main.js"]
