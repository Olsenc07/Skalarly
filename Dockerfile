# Build Frontend SSR & static assets
FROM node:18.20.2 as build-step
WORKDIR /app
COPY package*.json ./

RUN npm install 
COPY . .
RUN npm run build

# Step 2: Setup the server
FROM node:18.20.2 

WORKDIR /app


# Set up the production environment
FROM node:20.10.0
WORKDIR /app
# Copy backend
COPY --from=backend-build /app/backend /app/backend
COPY --from=backend-build /app/backend/node_modules /app/backend/node_modules
#Copy SSR
COPY --from=frontend-build /app/skalarly-frontend/dist /app/backend/public
COPY --from=frontend-build /app/skalarly-frontend/dist/skalarly-frontend /app/backend/dist

EXPOSE 4200

ENV NODE_ENV production

# Start the unified server 
CMD ["node", "dist/server/server.mjs"]