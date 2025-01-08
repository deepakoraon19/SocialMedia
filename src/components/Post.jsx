import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Stack } from '@mui/material';


const Post = ({ captions, image, userName, createdOn }) => {
    const options = { year: "numeric", month: "long", day: "numeric" }

    return <Card sx={{ maxWidth: 600 }}>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    {userName[0].toUpperCase()}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
            }
            title={userName}
            subheader={new Date(createdOn).toLocaleDateString('en-US', options)}
        />
        <CardMedia
            component="img"
            image={image}
            alt="Paella dish"
        />
        <CardContent>
            <Stack direction={'row'}>

                <Typography variant="body1" color="text.primary" >
                    {`${userName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {captions}
                </Typography>
            </Stack>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
                <ShareIcon />
            </IconButton>
        </CardActions>
    </Card>
}

export default Post