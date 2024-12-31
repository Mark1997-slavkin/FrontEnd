import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function AboutPage() {
    return (
        <Container>
            <Box sx={{ mt: "120px", textAlign: "center" }}>
                <Typography variant="h3" sx={{ mb: "20px", fontWeight: "bold", color: "#3F51B5" }}>
                    About ChapterCloud
                </Typography>
                <Typography variant="body1" sx={{ mb: "20px", color: "#555", fontSize: "1.2rem", lineHeight: "1.8" }}>
                    Welcome to ChapterCloud, the ultimate platform for book lovers, enthusiasts, and readers of all genres. 
                    Whether you are a casual reader or an avid bookworm, ChapterCloud is designed to be your companion in exploring the 
                    world of literature. Our mission is simple: to create a space where readers can discover, track, and share their love for books.
                </Typography>

                <Typography variant="body1" sx={{ mb: "20px", color: "#555", fontSize: "1.2rem", lineHeight: "1.8" }}>
                    At ChapterCloud, we believe that every book has the power to transport readers to different worlds, open up new perspectives, 
                    and ignite the imagination. Our platform offers curated lists of books across various genres, whether you’re into timeless 
                    classics, contemporary fiction, or non-fiction reads. But ChapterCloud is more than just a book catalog; it's a community. 
                    With features like favorite lists, book reviews, and user profiles, you can share your journey with others who appreciate 
                    the magic of storytelling.
                </Typography>

                <Typography variant="body1" sx={{ mb: "20px", color: "#555", fontSize: "1.2rem", lineHeight: "1.8" }}>
                    The team behind ChapterCloud consists of passionate readers and tech enthusiasts who wanted to combine their love for books 
                    with the convenience of modern technology. We strive to keep the platform user-friendly, so whether you’re searching for 
                    your next favorite book or organizing your personal library, ChapterCloud makes it easy. Our goal is to continually 
                    enhance your experience, adding new features, book recommendations, and updates to keep you connected to the literary world.
                </Typography>

                <Typography variant="body1" sx={{ mb: "20px", color: "#555", fontSize: "1.2rem", lineHeight: "1.8" }}>
                    We are excited to be part of your reading adventure. Every great book begins with a single chapter, and with ChapterCloud, 
                    we hope to be there with you for each page you turn. Whether you're diving into a novel for the first time or rediscovering 
                    an old favorite, we aim to be your trusted companion in the journey. Happy reading!
                </Typography>

                <Typography variant="h5" sx={{ color: "#3F51B5", fontWeight: "bold", mt: "20px" }}>
                    — The ChapterCloud Team
                </Typography>
            </Box>
        </Container>
    );
}
