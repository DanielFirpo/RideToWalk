# Use the appropriate Node.js version for Next.js
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Define build arguments for the specified environment variables
ARG ALLOWED_IMAGE_DOMAIN
ARG CONTACT_FORM_TO_ADDRESS
ARG NEXT_PUBLIC_API_URL
ARG STRAPI_TOKEN
ARG NEXT_PUBLIC_FRONTEND_URL
ARG NODE_ENV
ARG RESEND_KEY

# Set environment variables using the build arguments
ENV ALLOWED_IMAGE_DOMAIN=$ALLOWED_IMAGE_DOMAIN
ENV CONTACT_FORM_TO_ADDRESS=$CONTACT_FORM_TO_ADDRESS
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV STRAPI_TOKEN=$STRAPI_TOKEN
ENV NEXT_PUBLIC_FRONTEND_URL=$NEXT_PUBLIC_FRONTEND_URL
ENV NODE_ENV=$NODE_ENV
ENV RESEND_KEY=$RESEND_KEY

# Copy backend folder first (needed for types)
COPY ./backend ./backend

# Copy frontend package.json and lockfile first (for npm install)
COPY ./frontend/package*.json ./frontend/

# Install frontend dependencies
WORKDIR /app/frontend
RUN npm install

# Now copy the rest of the frontend source files
COPY ./frontend ./frontend

# Build the frontend app
RUN npm run build

# Expose port for frontend app
EXPOSE 3000

# Run the app
CMD ["npm", "start"]