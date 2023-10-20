all:
	docker build -t my-react-app-image . 
	docker run -v .:/app -p 3000:3000 my-react-app-image
clean:
	docker system prune -a

# -v .:/app